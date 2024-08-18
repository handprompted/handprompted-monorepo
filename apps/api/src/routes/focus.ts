import { InternalRoute, t } from 'elysia';
import { exec } from 'child_process';

export const focusRoute: Partial<InternalRoute> ={
  method: 'POST',
  path: '/focus',
  handler: async (context) => {
    const { mode } = context.body as { mode: string };

    if (mode === 'work') {
      exec('open -a Slack', (err) => {
        if (err) {
          console.error('Error opening Slack:', err);
        }
      });
      exec('open -a Discord', (err) => {
        if (err) {
          console.error('Error opening Discord:', err);
        }
      });
      exec('open -a WezTerm', (err) => {
        if (err) {
          console.error('Error opening WezTerm:', err);
        }
      });

      return 'Opened work apps';
    }

    context.set.status = 400;
    return 'Invalid mode';
  },
  hooks: {
    body: t.Object({
      mode: t.String(), // Validate the body to ensure `mode` is a string
    })
  }
  
}


