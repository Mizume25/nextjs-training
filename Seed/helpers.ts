import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { User } from "@/types/definitions";


export type RecordQuery = {
  id: string;
  customer_id: string;
}
//Querys TypeScript

//Obtener usuarios
export const getUsersIds = async (): Promise<string[]> => {

    const { data, error:UseERrr } = await supabaseAdmin.auth.admin.listUsers();
    console.log("listUsers data:", data, "error:", UseERrr);
    return data.users.map(user => user.id) ?? [];
}

export const getUsersSize = async (): Promise<number> => {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    console.log("listUsers size data:", data, "error:", error);
    return data.users.length ?? 0;
}

//Obtener customer
export const getCustomersIds = async (): Promise<string[] | []> => {
    const { data } = await supabaseAdmin
    .from("customers")
    .select("*");

    return data?.map(customer => customer.id) ?? [];
}

//Obtener customer
export const getRecordsIds = async (): Promise<string[] | []> => {
    const { data } = await supabaseAdmin
    .from("records")
    .select("*");

    return data?.map(record => record.id) ?? [];
}

export const queryInvoice = async (): Promise<RecordQuery[] | []> => {
    const { data } = await supabaseAdmin
     .from("records")
    .select("id, customer_id");


    return data ?? [];
}