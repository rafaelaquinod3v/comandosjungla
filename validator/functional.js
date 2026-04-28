/**
 * functional.js - Core logic verification
 */
import { Fortress } from '../js/server.js';

async function testFortress() {
  console.log('--- Testing FORTRESS Layer ---');
  const fortress = new Fortress();

  // Test endpoints
  const authResponse = fortress.handleRequest('/auth');
  console.assert(authResponse.status === 200, 'Auth endpoint failed');
  console.assert(authResponse.message === 'Authentication Endpoint', 'Auth message mismatch');

  const unknownResponse = fortress.handleRequest('/unknown');
  console.assert(unknownResponse.status === 404, '404 handling failed');

  // Test OPA
  console.assert(fortress.enforceOPA('allow_all') === true, 'OPA allow_all failed');
  console.assert(fortress.enforceOPA('deny_all') === false, 'OPA deny_all failed');

  // Test JWT Rotation
  const secret1 = fortress.jwtSecret;
  const secret2 = fortress.rotateJWT();
  console.assert(secret1 !== secret2, 'JWT rotation failed');
  console.assert(fortress.jwtSecret === secret2, 'JWT secret not updated');

  console.log('FORTRESS tests passed.');
}

async function runTests() {
  try {
    await testFortress();
    console.log('All functional tests passed.');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

runTests();
