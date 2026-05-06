import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const cleanDatabase = async () => {
     const { count } = await supabaseAdmin
        .from("Customers")
        .select("*", { count: "exact", head: true });

    if (count === 0) {
        console.log("BD ya está vacía, no hay nada que limpiar");
        return;
    }
    try {
        await supabaseAdmin.from("Invoices").delete().not("id", "is", null);
        await supabaseAdmin.from("Documents").delete().not("id", "is", null);
        await supabaseAdmin.from("Records").delete().not("id", "is", null);
        await supabaseAdmin.from("Customers").delete().not("id", "is", null);
        // Usuarios al final porque customers depende de ellos
        const { data } = await supabaseAdmin.auth.admin.listUsers();
        await Promise.all(
            data.users.map(user => supabaseAdmin.auth.admin.deleteUser(user.id))
        );
        console.log("Usuarios eliminados ✓");
        console.log("Base de datos limpiada ✓");
    } catch (e) {
        console.error("Error limpiando la BD:", e);
    }
};

cleanDatabase().then(() => console.log("Clean completado")).catch(console.error);