const q = searchBarInput.getValue();

if (q == "") {
    List.removeAllItems();
    HBox3.setVisible(false);
}
PaginationService.instance.SearchApiRequest(q);