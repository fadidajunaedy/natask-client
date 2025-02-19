import { z } from "zod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modalSlice";

import Input from "../common/Input";
import Button from "../common/Button";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import useToast from "../../hooks/useToast";
import { updateTask } from "../../services/taskService";
import eventEmitter from "../../utils/eventEmitter";
import { getAllEmployee } from "../../services/employeeService";

const taskSchema = z.object({
  employeeId: z.string().nonempty(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  priority: z.string().nonempty(),
  type: z.string().nonempty(),
  assignedAt: z.string().nonempty(),
  deadlineAt: z.string().nonempty(),
});

const FormEditTask = () => {
  const { data } = useSelector((state) => state.modal);

  const [state, setState] = useState(data);
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const showToast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    try {
      const {
        _id,
        _v,
        createdAt,
        updatedAt,
        subtasks,
        employee,
        ...updatedData
      } = state;

      taskSchema.parse(updatedData);

      const response = await updateTask(_id, updatedData);
      if (response.status === 200) {
        eventEmitter.emit("taskChanged");
        showToast("SUCCESS", response.data.message);
        dispatch(closeModal());
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formErrors);
      } else {
        console.log(error);
        showToast("ERROR", error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await getAllEmployee(controller.signal);
        if (response.success) setEmployees(response.data);
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

    fetchEmployees();
    eventEmitter.on("employeeChanged", fetchEmployees);

    return () => {
      controller.abort();
      eventEmitter.off("employeeChanged", fetchEmployees);
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Select
          name="employeeId"
          label="Employee"
          value={state.employeeId}
          onChange={(e) =>
            setState((prev) => ({ ...prev, employeeId: e.target.value }))
          }
          loading={loading}
          error={errors.employeeId}
        >
          <option disabled selected>
            Select one
          </option>
          {employees.length > 0 &&
            employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
        </Select>
        <Input
          name="title"
          label="Title"
          value={state.title}
          onChange={(e) =>
            setState((prev) => ({ ...prev, title: e.target.value }))
          }
          loading={loading}
          error={errors.title}
        />
        <Textarea
          name="description"
          label="Description"
          value={state.description}
          onChange={(e) =>
            setState((prev) => ({ ...prev, description: e.target.value }))
          }
          loading={loading}
          error={errors.description}
        />
        <Select
          name="priority"
          label="Priority"
          value={state.priority}
          onChange={(e) =>
            setState((prev) => ({ ...prev, priority: e.target.value }))
          }
          loading={loading}
          error={errors.type}
        >
          <option disabled selected>
            Select one
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Input
          name="type"
          label="Type"
          value={state.type}
          placeholder="Frontend/Backend/FullStack/Other"
          onChange={(e) =>
            setState((prev) => ({ ...prev, type: e.target.value }))
          }
          loading={loading}
          error={errors.type}
        />
        <Input
          type="date"
          name="assignedAt"
          label="Assigned At"
          value={state.assignedAt}
          onChange={(e) =>
            setState((prev) => ({ ...prev, assignedAt: e.target.value }))
          }
          loading={loading}
          error={errors.assignedAt}
        />
        <Input
          type="date"
          name="deadlineAt"
          label="Deadline At"
          value={state.deadlineAt}
          onChange={(e) =>
            setState((prev) => ({ ...prev, deadlineAt: e.target.value }))
          }
          loading={loading}
          error={errors.deadlineAt}
        />
        <Button level="primary" type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default FormEditTask;
