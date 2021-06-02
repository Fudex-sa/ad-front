export const state = () => ({
    amount: "",
    orderNumber: "",
    checkout: {},
    current_page_pagination: 1,
    back_button: false
});

export const getters = {
    amount(state) {
        return state.amount;
    },
    orderNumber(state) {
        return state.orderNumber;
    },
    checkout(state) {
        return state.checkout;
    },
    currentPagePagination(state) {
        return state.current_page_pagination;
    },
    backButton(state) {
        return state.back_button
    }
};

export const mutations = {
    SET_PAYMENT_AMOUNT(state, paymentAmount) {
        state.amount = paymentAmount;
    },
    SET_PAYMENT_ORDER_NUMBER(state, orderNumber) {
        state.orderNumber = orderNumber;
    },
    SET_PAYMENT_CHECKOUT_ID(state, checkout) {
        state.checkout = checkout;
    },
    SET_CURRENT_PAGE_PAGINATION(state, payload) {
        state.current_page_pagination = payload
    },
    SET_BACK_BUTTON(state, payload) {
        debugger
        state.back_button = payload
    }
};