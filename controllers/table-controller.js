export function tables(data) {
    const datatablesSimple = document.getElementById("datatablesSimple");

    if (datatablesSimple) {
        let datatable = new simpleDatatables.DataTable(datatablesSimple);

        let myData = {
            headings: ["ID", "Nome", "Categoria", "Opções"],
            data: data,
        };

        datatable.insert(myData);
    }
}
