import css from './App.module.css';
import * as NoteService from "../../services/noteService.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import {useState} from "react";
import NoteList from "../NoteList/NoteList.tsx";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";

const App = () => {
    const [query, setQuery] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const {data, isError, isLoading} = useQuery({
        queryKey: ['notes', query, page],
        queryFn: () => NoteService.getAllNotes(query, page),
        placeholderData: keepPreviousData
    })

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const onOpenModal = () => {
        setIsModalOpen(true);
    }

    const onCloseModal = () => {
        setIsModalOpen(false);

    }

    const setSearchQuery = (searchQuery: string) => {
        setQuery(searchQuery);
        setPage(1);
    }


    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox query={query} setQuery={setSearchQuery}/>
                {data && data.totalPages > 1 && (
                    <Pagination page={page} setPage={setCurrentPage} totalPages={data.totalPages}/>
                )}

                <button className={css.button} onClick={onOpenModal}>Create note +</button>

            </header>
            {isModalOpen && (
                <Modal onCloseModal={onCloseModal}>
                    <NoteForm onClear={onCloseModal}/>
                </Modal>
            )}
            {isLoading && <p className={css.loading}>Loading...</p>}
            {isError && <p className={css.error}>Error loading notes</p>}
            {data && data.notes.length > 0 && (
                <NoteList notes={data?.notes}/>
            )}

        </div>

    );
};
export default App