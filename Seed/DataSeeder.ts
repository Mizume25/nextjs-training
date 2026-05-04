import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import {
    CustomerFaker,
    RecordFaker,
    DocumentFaker,
    InvoiceFaker
} from './Factories'
import { createClient } from "@/lib/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getUsersSize } from "./helpers";



const main = async () => {
  const size = await getUsersSize();
  console.log("Usuarios encontrados:", size);
  const MAX_SIZE = size;
  await runSeeder(MAX_SIZE);
};

export const runSeeder = async (MAX_SIZE:number) => {

    try {  
    
        
        const customers = await Promise.all(
            Array.from({ length: MAX_SIZE }, () => CustomerFaker())
        );
        const { error:CustomErr } = await supabaseAdmin.from("Customers").insert(customers);
        if (CustomErr) throw new Error(CustomErr.message);
        console.log("Customers a insertar:", customers.length, customers[0]);
        console.log("Customers:", CustomErr ?? "OK");
        const records = await Promise.all(
            Array.from({ length: MAX_SIZE }, () => RecordFaker())
        );
        const { error:RecordErr} = await supabaseAdmin.from("Records").insert(records);
        if (RecordErr) throw new Error(RecordErr.message);
        console.log("Customers a insertar:", records.length, records[0]);
        console.log("Records:", RecordErr ?? "OK");
        const documents = await Promise.all(
            Array.from({ length: MAX_SIZE }, () => DocumentFaker())
        );
        const { error:DocErr } = await supabaseAdmin.from("Documents").insert(documents);
        if (DocErr) throw new Error(DocErr.message);
        console.log("Customers a insertar:", documents.length, documents[0]);
        console.log("Documents:", DocErr ?? "OK");

        const invoices = await Promise.all(
            Array.from({ length: MAX_SIZE }, () => InvoiceFaker())
        );
        const { error:invoiceErr} = await supabaseAdmin.from("Invoices").insert(invoices);
        if (invoiceErr) throw new Error(invoiceErr.message);
        console.log("Customers a insertar:", invoices.length, invoices[0]);
        console.log("Invoices:", invoiceErr ?? "OK");
    } catch (e) {
        console.error("Error en el seeder:", e);
    }


};


main().then(() => console.log("Seeder completado")).catch(console.error);