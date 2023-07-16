// Module Imports
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor dossier{
  // Tokenomics and Token Details ( All Hard Coded Values )
  let totalSupply: Nat = 1000000000000;
  let symbol: Text = "DOSS";
  let foundationPrincipal: Text = "4sgdh-3mrsd-3k7t6-2wche-fz6k5-nyjwg-lna6q-o4wz2-qvtuv-heoml-iqe";
  let faucetPrincipal: Text = "vuuo7-hyaaa-aaaal-qbfja-cai";
  let giveAmount = 5000;
  let createLogFee: Nat = 5;
  let deleteLogFee: Nat = 1;

  // Owner Principal
  let foundation : Principal = Principal.fromText(foundationPrincipal);
  // Faucet Principal 
  let faucet : Principal = Principal.fromText(faucetPrincipal);

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  
  if(balances.size() < 1){
    balances.put(foundation, totalSupply);
  };

  // Get Token Symbol
  public query func getSymbol(): async Text{
    return symbol;
  };

  // Get Log Creation Fee
  public query func getCreateLogFee(): async Nat{
    return createLogFee;
  };

  // Get Log Deletion Fee
  public query func getDeleteLogFee(): async Nat{
    return deleteLogFee;
  };

  // Get Faucet Amount
  public query func faucetAmount(): async Nat{
    return giveAmount;
  };

  // Dossier Finance
  // Balance Block
  public query func balanceOf(who: Principal): async Nat{
    let balance: Nat = switch(balances.get(who)){
      case null 0;
      case(?result) result;
    };
    return balance;
  };

  // Faucet Block
  public shared(msg) func payOut(): async Text{
    // Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller) == null){
      let result = await transfer(msg.caller, giveAmount);
      return result;
    }else{
      return "! Aready Claimed !";
    }
  };
  
  //Transfer Block

  public shared(msg) func transfer(reciever: Principal, amount: Nat): async Text{
    let senderBalance = await balanceOf(msg.caller);
    if(senderBalance>=amount){
      let newSenderBalance: Nat = senderBalance - amount;
      balances.put(msg.caller, newSenderBalance);

      let recieverBalance = await balanceOf(reciever);
      let newrecieverBalance = recieverBalance + amount;
      balances.put(reciever, newrecieverBalance);
      
      return "! Success !";
    }else{
      return "! Insufficient Funds !";
    }
  }; 

  // Create Log Fee Deduction
  public shared(msg) func deductCreateLogFee():async Text{
    let userBalance = await balanceOf(msg.caller);
    if(userBalance>=createLogFee){
      let newUserBalance: Nat = userBalance - createLogFee;
      balances.put(msg.caller, newUserBalance);
      let faucetBalance: Nat = await balanceOf(faucet);
      let newFaucetBalance = faucetBalance + createLogFee;
      balances.put(faucet, newFaucetBalance);
      return "! Success !";
    }else{
      return "! Insufficient Funds !";
    }
  };

  // Delete Log Fee Deduction
  public shared(msg) func deductDeleteLogFee():async Text{
    let userBalance = await balanceOf(msg.caller);
    if(userBalance>=deleteLogFee){
      let newUserBalance: Nat = userBalance - deleteLogFee;
      balances.put(msg.caller, newUserBalance);

      let faucetBalance: Nat = await balanceOf(faucet);
      let newFaucetBalance = faucetBalance + deleteLogFee;
      balances.put(faucet, newFaucetBalance);
      return "! Success !";
    }else{
      return "! Insufficient Funds !";
    }
  };

  // Dossier 
  // Create Log 
  public type Log = {
    userId: Text;
    title: Text;
    content: Text;
    time: Text;
    date: Text;
  };

  stable var logs: List.List<Log> = List.nil<Log>();

  public func createLog(userIdText: Text, titleText: Text, contentText: Text, timeText: Text, dateText: Text){
      let newLog: Log = {
        userId = userIdText;
        title = titleText;
        content = contentText;
        time = timeText;
        date = dateText;
      };
      logs:= List.push(newLog, logs);
      // Debug.print(debug_show(logs));
  };

  // View Log
  public query func readLogs(): async [Log]{
    return List.toArray(logs)
  };

  // Delete Log
  public func removeLog(id: Nat){
      let listFront = List.take(logs, id);
      let listBack = List.drop(logs, id+1);
      logs := List.append(listFront, listBack);
  };

  // Dossier Account
  public type ActivityLog = {
    user: Text;
    activity: Text;
    amount: Text;
    time: Text;
    date: Text;
  };

  stable var activityLogs: List.List<ActivityLog> = List.nil<ActivityLog>();

  public func createActivityLog(userText: Text, activityText: Text, amountText: Text, timeText: Text, dateText: Text){
      let newActivityLog: ActivityLog = {
        user = userText;
        activity = activityText;
        amount = amountText;
        time = timeText;
        date = dateText;
      };
      activityLogs:= List.push(newActivityLog, activityLogs);
      Debug.print(debug_show(activityLogs));
  };

  // View Activity Log
  public query func readActivityLogs(): async [ActivityLog]{
    return List.toArray(activityLogs);
  };

  // 
  system func preupgrade(){
    balanceEntries:= Iter.toArray(balances.entries());
  };

  system func postupgrade(){
    balances:= HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if(balances.size() < 1){
      balances.put(foundation, totalSupply);
    };
  };

}