import * as Yup from "yup";


const TodoSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    status: Yup.string().required("Status is required"),
});

export { TodoSchema }