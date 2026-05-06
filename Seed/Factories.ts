import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
//LISTA DE FUNCIONES FAKER
import { faker } from '@faker-js/faker'
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
    Customer,
    Invoice,
    Record,
    Document,
    RecordType,
    RecordStatus,
    InvoceStatus
} from '@/types/definitions'
import { getUsersIds,getCustomersIds,getRecordsIds, queryInvoice } from './helpers'
import { RecordQuery } from './helpers'

export const UserFaker = async () => {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: faker.internet.email(),
        password: faker.internet.password(),
        email_confirm: true,
        user_metadata: {
            name: faker.person.fullName()
        }
    });

    if (error) throw new Error(error.message);
    return data.user;
}

let i = 0;
export const CustomerFaker = async ():  Promise<Omit<Customer, "id" | "created_at" | "updated_at">> => {

    
    const ids : string[]  = await getUsersIds();
    
    if (ids.length == 0) throw new Error("No se puede relacionar con ningun random");
    const user_id = ids[i];
    i = (i + 1) % ids.length;
         
        return ({
            name:faker.person.firstName(),
            nif: faker.string.numeric(8) + faker.string.alpha(1).toUpperCase(),
            telefono:faker.phone.number(),
            direccion:faker.location.streetAddress(),
            user_id: user_id
        })

     
}

let j = 0;
export const RecordFaker = async():  Promise<Omit<Record, "id" | "created_at" | "updated_at">> => {
        
        const ids : string[]  = await getCustomersIds();
        if (ids.length == 0) throw new Error("No se puede relacionar con ningun random");
        
        const customer_id = ids[j];
         j = (j + 1) % ids.length;

        return ({
            type: getType(),
            status:getStatusRecord(),
            description:faker.lorem.paragraph(),
            customer_id:customer_id
        })

}

let k = 0;
export const DocumentFaker = async(): Promise<Omit<Document, "id" | "created_at" | "updated_at">> => {
   
    const ids : string[]  = await getRecordsIds();
    if (ids.length == 0) throw new Error("No se puede relacionar con ningun random");
    const record_id = ids[k];
    k = (k + 1) % ids.length;

    return({
        name:faker.lorem.words(5),
        url:faker.internet.url(),
        type_mime:faker.system.mimeType(),
        record_id: record_id
    })
}

let a = 0;
export const InvoiceFaker = async(): Promise<Omit<Invoice, "id" | "created_at" | "updated_at">> => {
   
    const ids: RecordQuery[] = await queryInvoice();

    if (ids.length == 0) throw new Error("No se puede relacionar con ningun random");
    const record_id = ids[a].id;
    const custom_id = ids[a].customer_id;

    a = (a + 1) % ids.length;


    return({
        amount:parseInt(faker.finance.amount()),
        status:getInvoiceStatus(),
        emission: new Date().toISOString() ,
        record_id:record_id,
        customer_id:custom_id
    })
}






//Helpers
const recordTypes = ["tax", "labor", "accounting", "legal"] as const;
const getType = ():RecordType => {
    return recordTypes[Math.floor(Math.random() * recordTypes.length)];
    
}

const recordStatus = ["pending", "in_process", "completed", "archived"] as const;
const getStatusRecord = ():RecordStatus => {
    return recordStatus[Math.floor(Math.random() * recordStatus.length)];
    
}

const invoiceStatus = ["pending", "paid", "overdue"] as const;
const getInvoiceStatus = ():InvoceStatus => {
    return invoiceStatus[Math.floor(Math.random() * invoiceStatus.length)];
    
}

