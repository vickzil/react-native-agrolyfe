import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountMangager } from "../../store/accountManager/actions";
import { getAllUserBankAccounts } from "../../store/bank/actions";
import { fetchAllInvestment, getMyInvestments } from "../../store/products/actions";
import { getUserReferrals } from "../../store/referrals/actions";
import { getSavingsMainCategories, getUserSavings } from "../../store/savings/actions";
import { getTransactionsInfo } from "../../store/transactions/actions";
import { getAirtimeDataProvidersPlans, getCableTVProviders } from "../../store/utilities/actions";
import { getUserWalletBalance, getWalletOptions } from "../../store/wallet/actions";

const AllApiCalls = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const refreshing = useSelector((state) => state.oauth.refreshing);

  useEffect(() => {
    if (refreshing === true) {
      dispatch(getTransactionsInfo(user?.code));
      dispatch(fetchAllInvestment(user?.code));
      dispatch(getMyInvestments(user?.code));
      dispatch(getUserSavings(user?.code));
      dispatch(getSavingsMainCategories(user?.code));
      dispatch(getUserReferrals(user?.code));
      dispatch(getAccountMangager(user?.code));
      dispatch(getAllUserBankAccounts(user?.code));
      dispatch(getUserWalletBalance(user?.code));
      dispatch(getWalletOptions(user?.code));
      dispatch(getAirtimeDataProvidersPlans(user?.code));
      dispatch(getCableTVProviders(user?.code));
    }
  }, [refreshing]);
  return null;
};

export default AllApiCalls;
