import { Note } from "@/types/note";
import axios from "axios";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
export const fetchNotes = async (
  query: string = "",
  page: number = 1,
  perPage: number = 12,
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("notes", {
    params: {
      search: query,
      page,
      perPage,
    },
  });
  return response.data;
};

export const createNote = async (newNote: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>("notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`notes/${id}`);
  return response.data;
};
