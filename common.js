var generateClass = require('./lib/helpers/class-generator');

var AlreadyInUseError = AlreadyInUse = require('./lib/alreadyInUse');
var ArgumentError = Argument = require('./lib/argument');
var ArgumentNullError = ArgumentNull = require('./lib/argumentNull');
var AuthenticationRequiredError = AuthenticationRequired = require('./lib/authenticationRequired');
var ConnectionError = generateClass('ConnectionError');
var CommonError = generateClass('Error');
var Error = generateClass('Error');
var HttpStatusError = HttpStatus = require('./lib/http-status');
var InvalidOperationError = require('./lib/invalid-operation');
var NotFoundError = require('./lib/not-found');
var NotImplementedError = generateClass('NotImplementedError');
var NotSupportedError = NotSupported = require('./lib/not-supported');
var NotPermittedError = NotPermitted = require('./lib/notPermitted');
var OutOfMemoryError = generateClass('OutOfMemoryError');
var CommonRangeError = generateClass('RangeError', { extends: RangeError });
var CommonReferenceError = generateClass('ReferenceError', { extends: ReferenceError });
var StackOverflowError = generateClass('StackOverflowError');
var CommonSyntaxError = generateClass('SyntaxError', { extends: SyntaxError });
var TimeoutError = require('./lib/timeout.js');
var CommonTypeError = generateClass('TypeError', { extends: TypeError });
var CommonURIError = generateClass('URIError', { extends: URIError });
var ValidationError = Validation = require('./lib/validation');

var io = {
  IOError: require('./lib/io/io')
};
io.DirectoryNotFoundError = generateClass('DirectoryNotFoundError', { extends: io.IOError });
io.DriveNotFoundError = generateClass('DriveNotFoundError', { extends: io.IOError });
io.EndOfStreamError = generateClass('EndOfStreamError', { extends: io.IOError });
io.FileLoadError = require('./lib/io/file-load');
io.FileNotFoundError = require('./lib/io/file-not-found');
io.SocketError = generateClass('SocketError', { extends: io.IOError });

var data = {
  DataError: require('./lib/data/data')
};
data.MemcachedError = generateClass('MemcachedError', { extends: data.DataError });
data.MongoDBError = generateClass('MongoDBError', { extends: data.DataError });
data.RedisError = generateClass('RedisError', { extends: data.DataError });
data.RollbackError = generateClass('RollbackError', { extends: data.DataError });
data.SQLError = generateClass('SQLError', { extends: data.DataError });
data.TransactionError = generateClass('TransactionError', { extends: data.DataError });


var Generic = generateClass('GenericError'); //deprecated


var logErrorDeprecationWarning = false;
var logError = function(err, cb) {
  if (!logErrorDeprecationWarning) console.warn("logError is deprecated.  Use log instead.");
  logErrorDeprecationWarning = true;

  if (err && !err.isLogged) {
    err.isLogged = true;
    console.error(err);
  }
  if (cb) cb(err);
};

var log = function(err, message) {
  if (typeof err == 'string') {
    err = new Error(err);
  } else {
    if (message) {
      err.message = message;
    }
    err = prependCurrentStack(err, 3);
  }
  if (err) {
    console.error(err && err.stack || err);
    err.isLogged = true;
  }
  return err;
}

var prependCurrentStack = function(err, offset_) {
  var linesToSkip = (typeof offset_ === 'undefined') ? 2 : offset_;
  var stackToPrepend = (new Error()).stack.split("\n").slice(linesToSkip);
  var mainStack = (err.stack || '').split("\n");
  var errTitle = mainStack.shift();
  err.stack = [errTitle].concat(stackToPrepend, "====", mainStack).join("\n");
  return err;
};

module.exports = {
  AlreadyInUse: AlreadyInUse,
  AlreadyInUseError: AlreadyInUseError,
  Argument: Argument,
  ArgumentError: ArgumentError,
  ArgumentNull: ArgumentNull,
  ArgumentNullError: ArgumentNullError,
  AuthenticationRequired: AuthenticationRequired,
  AuthenticationRequiredError: AuthenticationRequiredError,
  CommonError: CommonError,
  ConnectionError: ConnectionError,
  data: data,
  Error: CommonError,
  Generic: Generic,
  HttpStatus: HttpStatus,
  HttpStatusError: HttpStatusError,
  InvalidOperationError: InvalidOperationError,
  helpers: {
    generateClass: generateClass,
  },
  io: io,
  log: log,
  logError: logError,
  NotFoundError: NotFoundError,
  NotImplementedError: NotImplementedError,
  NotPermitted: NotPermitted,
  NotPermittedError: NotPermittedError,
  NotSupported: NotSupported,
  NotSupportedError: NotSupportedError,
  OutOfMemoryError: OutOfMemoryError,
  prependCurrentStack: prependCurrentStack,
  RangeError: CommonRangeError,
  ReferenceError: CommonReferenceError,
  StackOverflowError: StackOverflowError,
  SyntaxError: CommonSyntaxError,
  TimeoutError: TimeoutError,
  TypeError: CommonTypeError,
  URIError: CommonURIError,
  Validation: Validation,
  ValidationError: ValidationError,
};
