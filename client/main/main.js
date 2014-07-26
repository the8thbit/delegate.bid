var DELBID = angular.module('DELBID', ['ngRoute']);

DELBID.ctrls = {}
DELBID.ctrls.mainCtrl = function($scope) {
	$scope.delegates = [
		{ name: 'btsx.chinesecommunity', owner: 'ripplexiaoshan', category: 'faucet',      desc: 'The faucet is for new users from China',                     pay: 50, ownerpay: 50,  uptime: 99.5, version: '0.2.3' },
		{ name: 'bdnoble',               owner: 'bdnoble1206',    category: 'reliability', desc: 'Please vote for bdnoble: High Reliability.',                 pay: 99, ownerpay: 100, uptime: 99,   version: '0.2.3' },
		{ name: 'eightbit',              owner: '8bit',           category: 'service',     desc: 'You give me votes, and I\'ll give you horrible art!',        pay: 80, ownerpay: 100, uptime: null, version: '0.2.3' },
		{ name: 'commonwealth',          owner: '8bit',           category: 'enhancement', desc: 'Giving back to the bitshares community with a 0% pay rate.', pay: 0,  ownerpay: 0,   uptime: 90,   version: '0.2.3' },
		{ name: 'spartako',              owner: 'spartako',       category: 'reliability', desc: 'low pay rate, high reliability.',                            pay: 50, ownerpay: 100, uptime: 99,   version: '0.2.3' }
	];
}
DELBID.controller(DELBID.ctrls);
