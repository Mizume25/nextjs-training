// Interfaces de las entidades 
import { Database } from "./database.types";

//Exportaciones específicas:
export type User = Database['public']['Tables']['Users']['Row']
export type Customer = Database['public']['Tables']['Customers']['Row']
export type Record = Database['public']['Tables']['Records']['Row']
export type Document = Database['public']['Tables']['Documents']['Row']
export type Invoice = Database['public']['Tables']['Invoices']['Row']