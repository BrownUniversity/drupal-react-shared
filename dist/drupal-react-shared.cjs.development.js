'use strict';

var react = require('react');

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var useFetch = function useFetch(_ref) {
  var _ref$initialLoading = _ref.initialLoading,
      initialLoading = _ref$initialLoading === void 0 ? true : _ref$initialLoading,
      _ref$initialError = _ref.initialError,
      initialError = _ref$initialError === void 0 ? null : _ref$initialError,
      _ref$initialData = _ref.initialData,
      initialData = _ref$initialData === void 0 ? null : _ref$initialData,
      apiMethod = _ref.apiMethod,
      _ref$params = _ref.params,
      initialParams = _ref$params === void 0 ? {} : _ref$params,
      _ref$mungeResponse = _ref.mungeResponse,
      mungeResponse = _ref$mungeResponse === void 0 ? null : _ref$mungeResponse;

  var _useState = react.useState(initialLoading),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = react.useState(initialError),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = react.useState(initialData),
      data = _useState3[0],
      setData = _useState3[1];

  var params = react.useRef(initialParams);

  var fetch = function fetch() {
    try {
      var _temp2 = _catch(function () {
        return Promise.resolve(apiMethod(params.current)).then(function (response) {
          if (mungeResponse) {
            setData(mungeResponse(response));
          } else {
            setData(response);
          }
        });
      }, function (error) {
        setError(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var fetchWithLoading = function fetchWithLoading() {
    try {
      setLoading(true);
      return Promise.resolve(fetch()).then(function () {
        setLoading(false);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var refetch = function refetch(_temp3) {
    var _ref2 = _temp3 === void 0 ? {} : _temp3,
        _ref2$params = _ref2.params,
        nextParams = _ref2$params === void 0 ? null : _ref2$params,
        _ref2$withLoading = _ref2.withLoading,
        withLoading = _ref2$withLoading === void 0 ? true : _ref2$withLoading;

    if (nextParams) {
      params.current = nextParams;
    }

    if (withLoading) {
      fetchWithLoading();
    } else {
      fetch();
    }
  };

  react.useEffect(function () {
    if (initialLoading) {
      fetchWithLoading();
    }
  }, []);
  return {
    loading: loading,
    error: error,
    data: data,
    refetch: refetch
  };
};

exports.useFetch = useFetch;
//# sourceMappingURL=drupal-react-shared.cjs.development.js.map
