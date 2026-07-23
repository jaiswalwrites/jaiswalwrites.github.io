module.exports = {
  devopsSidebar: [
    { type: 'category', label: 'Infrastructure', items: ['k8s-deploy', 'docker-compose'] },
    { type: 'category', label: 'CI/CD', items: ['actions-setup', 'jenkins-pipeline'] }
  ],
  developerSidebar: [
    { type: 'category', label: 'SDK Integration', items: ['python-sdk', 'node-sdk'] },
    { type: 'category', label: 'API Reference', items: ['auth', 'endpoints'] }
  ],
  securitySidebar: [
    { type: 'category', label: 'Compliance', items: ['soc2', 'hipaa'] },
    { type: 'category', label: 'Access Control', items: ['rbac', 'audit-logs'] }
  ]
};
