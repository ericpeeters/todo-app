import $ from "jquery";
import { $todoList } from "./constants";

function bindSorting($dropdown) {
    $dropdown.on("change", function() {
        const chosenValue = $dropdown.val(),
            $todoItems = $todoList.children();

        switch (chosenValue) {
            case "title":
                sortByTitle($todoItems);
                break;
            case "date":
                sortByDate($todoItems);
                break;
            default:
                return;
        }
    });
}

function sortByTitle($todoItems) {
    const $sortedItems = $todoItems.sort(function(a, b) {
        const textA = a.innerText,
            textB = b.innerText;

        if (textA > textB) {
            return 1;
        } else if (textB > textA) {
            return -1;
        }

        return 0;
    });

    $todoList.html($sortedItems);
}

function sortByDate() {}

export function initSorting() {
    const $sortingDropdown = $(".js-sort-todos");

    bindSorting($sortingDropdown);
}
