// Interfaces de las entidades 
import { Database } from "./database";
//Exportaciones específicas:
export type User = Database['auth']['Tables']['users']['Row']
export type Customer = Database['public']['Tables']['Customers']['Row']
export type Record = Database['public']['Tables']['Records']['Row']
export type Document = Database['public']['Tables']['Documents']['Row']
export type Invoice = Database['public']['Tables']['Invoices']['Row']

export type RecordType = Database["public"]["Enums"]["record_type"];
export type RecordStatus = Database["public"]["Enums"]["record_status"];
export type InvoceStatus = Database["public"]["Enums"]["invoice_status"];