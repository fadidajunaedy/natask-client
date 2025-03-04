import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskPublic } from "../../services/taskPublicService";
import moment from "moment";
import Heading from "../common/Heading";
import Badge from "../common/Bagde";
import Avatar from "../common/Avatar";
import useToast from "../../hooks/useToast";
import SubTaskList from "../features/task/subTask/SubTaskList";

const Task = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { _id } = useParams();
  const showToast = useToast();

  useEffect(() => {
    const controller = new AbortController();
    const handleGerData = async () => {
      setLoading(true);
      try {
        const response = await getTaskPublic(_id, controller.signal);
        if (response.status === 200) setData(response.data.data);
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
    handleGerData();

    return () => controller.abort();
  }, [_id]);

  return (
    data && (
      <>
        <main className="w-full min-h-screen flex flex-col justify-center items-center gap-4 bg-base-200 p-4">
          <article className="max-w-lg flex flex-col gap-4 break-word bg-base-100 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Avatar
                size="3em"
                src={data.employee.photo}
                alt={data.employee.name}
              />
              <span className="text-lg font-semibold opacity-60">
                {data.employee.name}
              </span>
            </div>
            <div className="grow flex flex-col gap-2">
              <Heading level="h2" size="2xl">
                {data.title}
              </Heading>
              <p className="text-sm opacity-60 mb-2">{data.description}</p>
              <div className="flex flex-col gap-2 mb-2">
                <p className="text-sm opacity-60">
                  <span className="font-semibold">Assigned at:</span>
                  &nbsp;
                  {moment(data.assignedAt).format("DD MMMM YYYY")}
                </p>
                <p className="text-sm opacity-60">
                  <span className="font-semibold">Deadline at:</span>
                  &nbsp;
                  {moment(data.deadlineAt).format("DD MMMM YYYY")}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                <Badge
                  size="sm"
                  level={
                    data.priority === "high"
                      ? `error`
                      : data.priority === "medium"
                      ? `warning`
                      : `info`
                  }
                  soft
                >
                  {data.priority.charAt(0).toUpperCase() +
                    data.priority.slice(1)}{" "}
                  Priority
                </Badge>
                <Badge size="sm" level="primary" soft>
                  {data.type}
                </Badge>
              </div>
            </div>
            <SubTaskList taskId={_id} mode="PUBLIC" />
          </article>
          <span className="text-sm opacity-60">
            &copy;Natask 2024, All Rights Reserved.
          </span>
        </main>
      </>
    )
  );
};

export default Task;
