import css from './NoteForm.module.css';
import {useFormik} from "formik";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as NoteService from "../../services/noteService.ts";
import * as yup from 'yup';
import {MdErrorOutline} from "react-icons/md";


interface NoteFormProps {
    onClear: () => void,
}
const NoteForm = ({onClear}: NoteFormProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: NoteService.createNote,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
            onClear();
        },
        onError: (error) => {
            console.error('Error creating note:', error);
        },
    })

    const validationSchema = yup.object({
        title: yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(50, 'Title must be at most 50 characters'),
        content: yup.string()
            .required('Content is required')
            .max(500, 'Content must be at most 500 characters'),
        tag: yup.string()
            .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
            .required('Tag is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            tag: 'Todo',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            mutation.mutate(values)
        },
    })
const isError = (key:string)=> {
        return Object.hasOwn(formik.errors, key);
}

    return (
        <form className={css.form}
              onSubmit={formik.handleSubmit}
        >
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input id="title"
                       type="text"
                       name="title"
                       value={formik.values.title}
                       onChange={formik.handleChange}
                       className={css.input}
                />
                {isError('title') && (
                    <span
                        className={css.error}
                    >
                    <MdErrorOutline/>
                        {formik.errors.title}
                </span>
                )}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    rows={8}
                    className={css.textarea}
                />
                {isError('content') && (
                    <span
                        className={css.error}
                    >
                    <MdErrorOutline/>
                        {formik.errors.content}
                </span>
                )}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag"
                        name="tag"
                        value={formik.values.tag}
                        onChange={formik.handleChange}
                        className={css.select}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {isError('tag') && (
                    <span
                        className={css.error}
                    >
                    <MdErrorOutline/>
                        {formik.errors.tag}
                </span>
                )}
            </div>

            <div className={css.actions}>
                <button type="button"
                        className={css.cancelButton}
                        onClick={onClear}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                >
                    Create note
                </button>
            </div>
        </form>

    );
};
export default NoteForm