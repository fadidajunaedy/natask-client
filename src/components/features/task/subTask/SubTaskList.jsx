import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SubTaskItem from "./SubTaskItem";
import { getAllSubtask } from "../../../../services/subTaskService";
import eventEmitter from "../../../../utils/eventEmitter";
import useToast from "../../../../hooks/useToast";

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
        if (response.success) setData(response.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          showToast("ERROR", error.message);
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

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEB_SOCKET);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe", // Custom event type
          payload: data.length > 0 && data.map((subtask) => subtask._id), // Data yang di-subscribe
        })
      );
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Handle custom event
      if (message.event === "subtaskUpdated") {
        const newData = message.payload;
        // Cari indeks data yang akan digantikan
        const index = data.findIndex((subtask) => subtask._id === newData._id);

        // Jika data ditemukan, lakukan penggantian pada indeks yang sama
        if (index !== -1) {
          const updatedData = [...data];
          updatedData[index] = newData;
          setData(updatedData);
        } else {
          console.warn(
            "Subtask tidak ditemukan, tidak ada data yang diupdate!"
          );
        }
      } else {
        console.warn("Unknown event:", message.event);
      }
    };

    return () => {
      ws.close();
    };
  }, [data]);

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
