import { useEffect, useState } from "react";
import { getAllSubtask } from "../../../../services/subtaskService";

import SubTaskItem from "./SubTaskItem";
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
        if (response.status === 200) setData(response.data);
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
