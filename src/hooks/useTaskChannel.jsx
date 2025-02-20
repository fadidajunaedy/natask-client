import { useEffect, useMemo, useState } from "react";
import { getAllSubtask } from "../services/subtaskService";

import useToast from "./useToast";
import supabase from "../utils/supabaseClient";
import eventEmitter from "../utils/eventEmitter";

const useTaskChannel = (taskId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToast = useToast();

  useEffect(() => {
    const controller = new AbortController();
    const handleGetSubtask = async () => {
      setLoading(true);
      try {
        const response = await getAllSubtask(
          { taskId: taskId },
          controller.signal
        );
        if (response.status === 200) setData(response.data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
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
    if (!subtaskIds.length) return;

    const subtaskChannels = subtaskIds.map((_id) => {
      const subtaskChannel = supabase.channel(`subtask-${_id}`);

      subtaskChannel.on("broadcast", { event: "subtaskUpdated" }, (message) => {
        const newData = message.payload;
        const index = data.findIndex((subtask) => subtask._id === newData._id);
        if (index !== -1) {
          const currentData = [...data];
          currentData[index] = newData;
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
      subtaskChannels.forEach((channel) => supabase.removeChannel(channel));
    };
  }, [data, subtaskIds]);

  return { data, loading };
};

export default useTaskChannel;
