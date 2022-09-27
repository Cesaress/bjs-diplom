"use strics";

// logout

let logoutButton = new logoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {

        if (response.success === true) {
            location.reload();
        } else {
            console.error(response.error);
        }

    });
};

// get user info

let current = ApiConnector.current((response) => {

    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error('Ошибка профиля: ' + response.error);
    }

});

// get indexes

let ratesBoard = new ratesBoard();

function getCurrency() {
    ApiConnector.getStocks((response) => {

        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            console.error('Ошибка получения курсов валют');
        }

    });
}

getCurrency();

setInterval(getCurrency(), 60000);

// operations

let moneyManager = new moneyManager();

// add balance

moneyManager.addMoneyCallback = ((data) => {
    ApiConnector.addMoney(data, (response) => {

        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            moneyManager.setMessage(false, "Ошибка пополнения баланса");
        }

    });
});

// convert

moneyManager.conversionMoneyCallback = ((data) => {
    ApiConnector.convertMoney(data, (response) => {

        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация завершена успешно");
        } else {
            moneyManager.setMessage(false, "Ошибка конвертации");
        }

    });
});

// transition

moneyManager.sendMoneyCallback = ((data) => {
    ApiConnector.transferMoney(data, (response) => {

        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.moneyManager(true, "Перевод завершен успешно");
        } else {
            moneyManager.moneyManager(false, "Ошибка перевода");
        }

    });
});

// favorites

let favoritesWidget = new favoritesWidget();

// get favorites

ApiConnector.getFavorites = ((response) => {

    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }

});

// add favorites

favoritesWidget.addUserCallback = ((data) => {
    ApiConnector.addUserToFavorites(data, (response) => {

        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен");
        } else {
            favoritesWidget.setMessage(false, "Ошибка добавления в избранное: " + response.error);
        }

    });
});

// delete favorites

favoritesWidget.removeUserCallback = ((data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {

        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь удален");
        } else {
            favoritesWidget.setMessage(false, "Ошибка удаления из избранного: " + response.error);
        }
        
    });
});