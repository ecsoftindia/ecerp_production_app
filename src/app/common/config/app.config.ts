import { environment } from 'src/environments/environment';

export class AppConfig {
  public static basePath: string = environment.basePath;
  public static printUrl: string = environment.printUrl;
  public static baseAppPath: string = environment.baseAppPath;
  public static encrypt: boolean = environment.encrypt;
  public static corporateId: string = environment.corporateId;
  public static resendTime = 2;
  public static roleEnabled = false;
  public static routeGuardEnabled = false;
  public static userDataStorageName = '';
  public static baseCurrency = 'USD';
  public static dbname = 'ecproduction';
  public static dateServerFormat = 'dd-MM-yyyy';
  public static dateViewFormat = 'dd MMM yyyy';
  public static pageSizeOptions = [15, 50, 100];
  public static EmailPattern = '^S+@S+$';
  //public static appid = "FEATCARE";
}