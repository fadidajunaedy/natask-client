import SubtaskItem from "./SubtaskItem";
import useSubtaskListChannel from "../../../../hooks/useSubtaskListChannel";

const SubTaskList = ({ taskId, mode = "PRIVATE" }) => {
  const { data, loading } = useSubtaskListChannel(taskId, mode);

  return (
    <ul>
      {data.length > 0 &&
        data.map((subtask) => (
          <SubtaskItem
            key={subtask._id}
            data={subtask}
            mode={mode}
            loading={loading}
          />
        ))}
    </ul>
  );
};

export default SubTaskList;
