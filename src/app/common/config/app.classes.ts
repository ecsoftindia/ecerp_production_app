export class Message {
  infoMessage = new MsgDetail();
  errorMessage: any = [];
  hasError = false;

}

export class MsgDetail {
  msgID = 0;
  msgType = 0;
  msgDescription = '';
}

export class entLogin {
  corporatename = '';
  loginid = '';
  loginpin= '';
  userdeviceid = '';
  appid = "ECBILLSFA";
  clearprevioussession = 'YES';
  loginotp = '';
}

export class entUserData {

  usercode = '0';
  username = '';
  usermailid = '';
  companyname = '';
  token = '';
  currentlogin = '';
  lastlogin = '';
  notify = '';
  notifymessage = '';
  blockapp = '';
  errormessage = '';
  rightsprofilecode = '';
  usertypecode = '';
}

export class entDocumentUpload {
  entryno = "";
  entryname = "";
  doumentname = "";
  documenttype = "";
  document_base64string = "";
  documenttitle = "";
  entryid = "";
}