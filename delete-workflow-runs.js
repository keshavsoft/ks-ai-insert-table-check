import deleteWorkflowRuns from 'ks-delete-workflow-runs';

deleteWorkflowRuns().catch(err => {
  console.error('Failed to delete workflow runs:', err.message);
  process.exit(1);
});
