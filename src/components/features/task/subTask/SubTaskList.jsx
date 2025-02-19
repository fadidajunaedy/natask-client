import { useEffect, useMemo, useState } from "react";
import { getAllSubtask } from "../../../../services/subtaskService";

import SubTaskItem from "./SubTaskItem";
import eventEmitter from "../../../../utils/eventEmitter";
import useToast from "../../../../hooks/useToast";
import supabase from "../../../../utils/supabaseClient";

const SubTaskList = ({ taskId, viewMode = "DASHBOARD" }) => {
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
          // showToast("ERROR", error.response.data.message);
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

    const channels = subtaskIds.map((_id) => {
      const channel = supabase.channel(`subtask-${_id}`);

      channel.on("broadcast", { event: "subtaskUpdated" }, (message) => {
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

      channel.on("broadcast", { event: "subtaskDeleted" }, (message) => {
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

      channel.subscribe();
      return channel;
    });

    return () => {
      channels.forEach((channel) => supabase.removeChannel(channel));
    };
  }, [data, subtaskIds]);

  return (
    <ul>
      {data.length > 0 &&
        data.map((subTask) => (
          <SubTaskItem
            key={subTask._id}
            subTask={subTask}
            viewMode={viewMode}
          />
        ))}
    </ul>
  );
};

export default SubTaskList;
