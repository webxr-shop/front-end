window.addEventListener("DOMContentLoaded", (event) => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById("datatablesSimple");
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
});

new simpleDatatables.DataTable("#datatablesSimple", {
    labels: {
        placeholder: "Pesquisar...",
        perPage: "{select} por página",
        noRows: "Nenhum resultado encontrado",
        info: "Exibindo {start} a {end} de {rows} resultados",
        noResults: "Nenhum resultado encontrado"
    },
});
