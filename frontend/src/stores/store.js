import {create} from "zustand";
import axios from "axios";
import { data } from "../utils/Data";

const store = create((set) => ({
    selectedFile: null,

    data: {},

    transactions: [],


    onChange: (event) => {
        const file = event.target.files[0]
        set({selectedFile: file})
    },

    onUpload: async () => {
        try{
            const formData = new FormData();
            const {selectedFile} = store.getState();
            formData.append('file', selectedFile);
            console.log(selectedFile);
            const response = await axios.post("http://127.0.0.1:5000/upload_csv", formData)
            console.log(response.data['data'])
            window.alert(response.status)
        }catch(err){
            console.log(err)
        }
    },

    getAccountNum: async () => {
        try{
            const res = await axios.get("http://127.0.0.1:5000/get-account-numbers")
            const accNo = res.data.AccNo
            console.log(accNo)
            for(let i = 0; i < accNo.length; i++){
                set((state) => {
                    return {
                        data: {
                            ...state.data,
                            [accNo[i]]: {
                                deposits: null,
                                withdrawals: null,
                                balance: null
                            }
                        }
                    };
                });
            }
            console.log(Object.keys(store.getState().data))
            // window.alert(res.status)
        }catch(err){
            console.log(err)
        }
    },

    getTransactions: async (accNo) => {
        try{
            const res = await axios.get(`http://127.0.0.1:5000/get-transactions/${accNo}`)

            for(let i = 0; i < Object.keys(res.data["Transaction ID"]).length; i++){
                set((state) => {
                    return{
                        transactions: [
                            ...state.transactions,
                            {
                                tranID: res.data["Transaction ID"][i],
                                accountNo: res.data["Account Number"][i],
                                balance: res.data["Balance Amount"][i],
                                checkNo: res.data["Check Number"][i],
                                deposit: res.data["Deposit Amount"][i],
                                recAccountNo: res.data["Receiver Account Number"][i],
                                senAccountNo: res.data["Sender Account Number"][i],
                                tranDate: res.data["Transaction Date"][i],
                                tranDetail: res.data["Transaction Details"][i],
                                withdrawal: res.data["Withdrawal Amount"][i]
                            }
                        ]
                    }
                })
            }

            console.log(store.getState().transactions)
        }catch(err){
            console.log(err)
        }
    },

    getDeposits: async (accNo) => {
        try{
            console.log(store.getState().data)
            const res = await axios.get(`http://127.0.0.1:5000/deposits-amount/${accNo}`)

            const depositData = res.data
            set((state) => {
                return {
                    data: {
                        ...state.data,
                        [accNo]: {
                            ...state.data[accNo],
                            deposits: depositData,
                        }
                    }
                };
            });
            console.log(store.getState().data)
        }catch(err){
            console.log(err)
        }
    },
    getWithdrawals: async (accNo) => {
        try{
            console.log(store.getState().data)
            const res = await axios.get(`http://127.0.0.1:5000/withdrawals-amount/${accNo}`)

            console.log(store.getState().data[accNo])

            const withdrawalData = res.data
            set((state) => {
                return {
                    data: {
                        ...state.data,
                        [accNo]: {
                            ...state.data[accNo],
                            withdrawals: withdrawalData,
                        }
                    }
                };
            });
            console.log(store.getState().data)
        }catch(err){
            console.log(err)
        }
    },
    getBalance: async (accNo) => {
        try{
            console.log(store.getState().data)
            const res = await axios.get(`http://127.0.0.1:5000/balance-amount/${accNo}`)

            console.log(store.getState().data[accNo])

            const balanceData = res.data
            set((state) => {
                return {
                    data: {
                        ...state.data,
                        [accNo]: {
                            ...state.data[accNo],
                            balance: balanceData,
                        }
                    }
                };
            });
            console.log(store.getState().data)
        }catch(err){
            console.log(err)
        }
    },
}))

export default store