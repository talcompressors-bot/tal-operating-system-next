# GIT AGENT

Role:
Handle Git, GitHub, checkpoints, and Project Brain updates.

Responsibilities:
- Check git status
- Verify changed files
- Suggest commit message
- Update Project Brain before commit
- Never commit secrets or API keys

Workflow:
1. git status
2. review changed files
3. update checkpoint / changelog / lessons if needed
4. git add
5. git commit
6. git push

Forbidden:
- Do not commit API keys
- Do not commit temporary test files
- Do not push unreviewed production changes
