import { useEffect, useMemo, useState } from "react";
import { getAllSubtask } from "../services/subtaskService";
import { getAllSubtaskPublic } from "../services/subtaskPublicService";

import useToast from "./useToast";
import supabase from "../utils/supabaseClient";
import eventEmitter from "../utils/eventEmitter";

const useSubtaskListChannel = (taskId, mode = "PRIVATE") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToast = useToast();

  useEffect(() => {
    const controller = new AbortController();
    const handleGetSubtask = async () => {
      setLoading(true);
      try {
        let response;
        if (mode === "PRIVATE") {
          response = await getAllSubtask({ taskId: taskId }, controller.signal);
        } else if (mode === "PUBLIC") {
          response = await getAllSubtaskPublic(
            { taskId: taskId },
            controller.signal
          );
        }

        if (response.status === 200) setData(response.data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(error);
          showToast("ERROR", error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };
    handleGetSubtask();
    eventEmitter.on("subtaskChanged", handleGetSubtask);

    return () => {
      controller.abort();
      eventEmitter.off("subtaskChanged", handleGetSubtask);
    };
  }, [taskId]);

  const subtaskIds = useMemo(() => {
    return data.map((subtask) => subtask._id);
  }, [data]);

  useEffect(() => {
    const taskChannel = supabase.channel(`task-${taskId}`);
    taskChannel.on("broadcast", { event: "subtaskCreated" }, (message) => {
      console.log(message);
      const newSubtask = message.payload;
      const isDataExists = data.find(
        (subtask) => subtask._id === newSubtask._id
      );
      if (!isDataExists) {
        setData((prevData) => {
          const currentData = [...prevData];
          currentData.push(newSubtask);
          return currentData;
        });
      } else {
        console.warn("Subtask already exist, no data added");
      }
    });

    taskChannel.subscribe();

    return () => {
      supabase.removeChannel(taskChannel);
    };
  }, [data]);

  useEffect(() => {
    if (!subtaskIds.length) return;
    const subtaskChannels = subtaskIds.map((_id) => {
      const subtaskChannel = supabase.channel(`subtask-${_id}`);
      subtaskChannel.on("broadcast", { event: "subtaskUpdated" }, (message) => {
        const updatedSubtask = message.payload;
        const currentData = [...data];
        const index = currentData.findIndex(
          (subtask) => subtask._id === updatedSubtask._id
        );
        if (index !== -1) {
          currentData[index] = updatedSubtask;
          setData(currentData);
        } else {
          console.warn("Subtask not found, no data update");
        }
      });

      subtaskChannel.on("broadcast", { event: "subtaskDeleted" }, (message) => {
        const dataToDelete = message.payload;
        const isDataExists = data.find(
          (subtask) => subtask._id === dataToDelete._id
        );
        if (isDataExists) {
          const currentData = [...data];
          const filteredData = currentData.filter(
            (subtask) => subtask._id !== dataToDelete._id
          );
          setData(filteredData);
        } else {
          console.warn("Subtask not found, no data deleted");
        }
      });

      subtaskChannel.subscribe();
      return subtaskChannel;
    });

    return () => {
      subtaskChannels.forEach((subtaskChannel) =>
        supabase.removeChannel(subtaskChannel)
      );
    };
  }, [data, subtaskIds]);

  return { data, loading };
};

export default useSubtaskListChannel;
