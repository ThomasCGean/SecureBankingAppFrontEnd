const awsExports = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_qAYkxZlSp',
  aws_user_pools_web_client_id: '15ocuqh4vnvq7bo26pobp7iesl',
  aws_mandatory_sign_in: 'enable',
  oauth: {
    domain: 'https://us-east-1qaykxzlsp.auth.us-east-1.amazoncognito.com',
    scope: ['email', 'openid', 'profile'],
    redirectSignIn: 'http://localhost:5173/',
    redirectSignOut: 'http://localhost:5173/',
    responseType: 'code'
  }
};

export default awsExports;
