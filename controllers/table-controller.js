export function tables(id, data) {
    switch (id) {
        case 1:
            const datatablesSimple = document.getElementById("datatables");
            if (datatablesSimple) {
                var datatable = new simpleDatatables.DataTable(
                    datatablesSimple
                );

                let myData = {
                    headings: [
                        "ID",
                        "Nome",
                        "Altura.",
                        "Largura",
                        "Comprimento",
                        "Opções",
                    ],
                    data: [data],
                };
                datatable.insert(myData);
            }
            break;

        default:
            break;
    }
}
