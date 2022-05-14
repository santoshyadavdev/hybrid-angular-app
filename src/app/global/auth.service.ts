import {AppConfig} from "./appConfig.service";
import { globalModule } from './global.module';

/**
 * This service emulates an Authentication Service.
 */
export class AuthService {
  // data
  usernames: string[] = ['myself@angular.dev', 'devgal@angular.dev', 'devguy@angular.dev'];

  static $inject = ['AppConfig', '$q', '$timeout'];
  constructor(public AppConfig: AppConfig, public $q, public $timeout) { }

  /**
   * Returns true if the user is currently authenticated, else false
   */
  isAuthenticated() {
    return !!this.AppConfig.emailAddress;
  }

  /**
   * Fake authentication function that returns a promise that is either resolved or rejected.
   *
   * Given a username and password, checks that the username matches one of the known
   * usernames (this.usernames), and that the password matches 'password'.
   *
   * Delays 800ms to simulate an async REST API delay.
   */
  authenticate(username, password) {
    let { $timeout, $q, AppConfig } = this;

    // checks if the username is one of the known usernames, and the password is 'password'
    const checkCredentials = () => $q((resolve, reject) => {
      var validUsername = this.usernames.indexOf(username) !== -1;
      var validPassword = password === 'password';

      return (validUsername && validPassword) ? resolve(username) : reject("Invalid username or password");
    });

    return $timeout(checkCredentials, 800)
        .then((authenticatedUser) => {
          AppConfig.emailAddress = authenticatedUser;
          AppConfig.save()
        });
  }

  /** Logs the current user out */
  logout() {
    this.AppConfig.emailAddress = undefined;
    this.AppConfig.save();
  }
}

globalModule.service('AuthService', AuthService);
