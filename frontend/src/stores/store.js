import { create } from "zustand";
import axios from "axios";
import { data } from "../utils/Data";

const store = create((set) => ({
  selectedFile: null,

  data: {},

  transactions: [],

  allTransactions: [],

  navbar: null,

  setNavbar: (val) => {
    set({navbar: val})
  },

  //Navbar
  navAnimate: false,
  navOpen: false,
  navDocked: true,
  navWidth: 256,

  setNavAnimate: (val) => {
    set({ navAnimate: val });
  },

  setNavOpen: (val) => {
    set({ navOpen: val });
    console.log(store.getState().navOpen);
  },

  setNavDocked: (val) => {
    set({ navDocked: val });
  },

  onChange: (event) => {
    const file = event.target.files[0];
    set({ selectedFile: file });
  },

  onUpload: async () => {
    try {
      const formData = new FormData();
      const { selectedFile } = store.getState();
      formData.append("file", selectedFile);
      console.log(selectedFile);
      const response = await axios.post(
        "http://127.0.0.1:5000/upload_csv",
        formData
      );
      console.log(response.data["data"]);
      window.alert(response.status);
    } catch (err) {
      console.log(err);
    }
  },

  getAccountNum: async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/get-account-numbers");
      const accNo = res.data.AccNo;
      console.log(accNo);
      for (let i = 0; i < accNo.length; i++) {
        set((state) => {
          return {
            data: {
              ...state.data,
              [accNo[i]]: {
                deposits: null,
                withdrawals: null,
                balance: null,
                ml_data: null,
              },
            },
          };
        });
      }
      console.log(Object.keys(store.getState().data));
      // window.alert(res.status)
    } catch (err) {
      console.log(err);
    }
  },

  getTransactions: async (accNo) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/get-transactions/${accNo}`
      );

      set({ transactions: [] });

      for (let i = 0; i < Object.keys(res.data["Transaction ID"]).length; i++) {
        set((state) => {
          let tranIDList =
            state.transactions !== undefined
              ? state?.transactions.map((tran) => {
                  return tran["tranID"];
                })
              : [];

          if (res.data["Transaction ID"][i] in tranIDList === false) {
            return {
              transactions: [
                ...state.transactions,
                {
                  tranID: res.data["Transaction ID"][i].toString(),
                  accountNo: res.data["Account Number"][i],
                  balance: res.data["Balance Amount"][i],
                  checkNo: res.data["Check Number"][i],
                  secAccountNo: res.data["Second Account Number"][i],
                  tranDate: res.data["Transaction Date"][i],
                  tranDetail: res.data["Transaction Details"][i],
                  amount: res.data["Amount"][i],
                  type: res.data["Type"][i],
                },
              ],
            };
          }
        });
      }

      console.log(store.getState().transactions);
    } catch (err) {
      console.log(err);
    }
  },

  getAllTransactions: async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/get-all-transactions`);

      set({ allTransactions: [] });

      console.log(res.data);

      Object.keys(res.data).forEach((accID) => {
        for (
          let i = 0;
          i < Object.keys(JSON.parse(res.data[accID])["Transaction ID"]).length;
          i++
        ) {
          set((state) => {
            let tranIDList =
              state.allTransactions !== undefined
                ? state?.allTransactions.map((tran) => {
                    return tran["tranID"];
                  })
                : [];

            if (JSON.parse(res.data[accID])["Transaction ID"][i] in tranIDList === false) {
              return {
                allTransactions: [
                  ...state.allTransactions,
                  {
                    tranID: JSON.parse(res.data[accID])["Transaction ID"][i],
                    accountNo: JSON.parse(res.data[accID])["Account Number"][i],
                    balance: JSON.parse(res.data[accID])["Balance Amount"][i],
                    checkNo: JSON.parse(res.data[accID])["Check Number"][i],
                    secAccountNo: JSON.parse(res.data[accID])["Second Account Number"][i],
                    tranDate: JSON.parse(res.data[accID])["Transaction Date"][i],
                    tranDetail: JSON.parse(res.data[accID])["Transaction Details"][i],
                    amount: JSON.parse(res.data[accID])["Amount"][i],
                    type: JSON.parse(res.data[accID])["Type"][i],
                  },
                ],
              };
            }
          });
        }
      });

      console.log(store.getState().allTransactions);
    } catch (err) {
      console.log(err);
    }
  },

  getDeposits: async (accNo) => {
    try {
      console.log(store.getState().data);
      const res = await axios.get(
        `http://127.0.0.1:5000/deposits-amount/${accNo}`
      );

      const depositData = res.data;
      set((state) => {
        return {
          data: {
            ...state.data,
            [accNo]: {
              ...state.data[accNo],
              deposits: depositData,
            },
          },
        };
      });
      console.log(store.getState().data);
    } catch (err) {
      console.log(err);
    }
  },
  getWithdrawals: async (accNo) => {
    try {
      console.log(store.getState().data);
      const res = await axios.get(
        `http://127.0.0.1:5000/withdrawals-amount/${accNo}`
      );

      console.log(store.getState().data[accNo]);

      const withdrawalData = res.data;
      set((state) => {
        return {
          data: {
            ...state.data,
            [accNo]: {
              ...state.data[accNo],
              withdrawals: withdrawalData,
            },
          },
        };
      });
      console.log(store.getState().data);
    } catch (err) {
      console.log(err);
    }
  },
  getBalance: async (accNo) => {
    try {
      console.log(store.getState().data);
      const res = await axios.get(
        `http://127.0.0.1:5000/balance-amount/${accNo}`
      );

      console.log(store.getState().data[accNo]);

      const balanceData = res.data;
      set((state) => {
        return {
          data: {
            ...state.data,
            [accNo]: {
              ...state.data[accNo],
              balance: balanceData,
            },
          },
        };
      });
      console.log(store.getState().data);
    } catch (err) {
      console.log(err);
    }
  },

  getMLGraph: async (accNo) => {
    try {
      console.log(store.getState().data);
      const res = await axios.get(`http://127.0.0.1:5000/ml-graph/${accNo}`);

      const mlData = res.data;
      set((state) => {
        return {
          data: {
            ...state.data,
            [accNo]: {
              ...state.data[accNo],
              ml_data: mlData,
            },
          },
        };
      });
      console.log(store.getState().data);
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store;
