# CI/CD

Single-branch model: everything lives on `master`. Work happens on short-lived
branches that are merged back into `master` through pull requests.

| Branch      | Role                                       |
| ----------- | ------------------------------------------ |
| `master`    | Production. Tagged + published on merge.   |
| `feature/*`, `fix/*`, `hotfix/*` | Short-lived, branched from `master`, PR'd back into it. |

## Workflows

### `ci.yml` — quality gate
Runs on every PR and push to `master`: `npm ci`, lint (prettier + eslint + tsc),
`build`, and `test:ci`. Exposes the **`verify`** status check used by branch protection.

### `pr-validation.yml` — release label
On every PR into `master`, enforces exactly one label among
`release:major` / `release:minor` / `release:patch` / `release:skip`.
Exposes the **`require-release-label`** status check.

### `release.yml` — release on merge (label-driven, approval-gated)
When a PR is merged into `master`:
1. **prepare** reads the release label and computes the bump (skips on `release:skip` or no label).
2. **release** waits for manual approval via the **`release`** environment, then:
   bumps the version, builds, commits the bump to `master`, tags `vX.Y.Z`,
   publishes to npm (`--access public`), and creates the GitHub Release with auto-generated notes.

A manual `workflow_dispatch` (with a `patch`/`minor`/`major` input) is available as a fallback.

## One-time setup

Run the helper (requires `gh` with admin rights):

```bash
./.github/setup-repo.sh
```

It creates the labels and protects `master`.

Then, in the GitHub UI:

1. **Settings → Environments →** create `release` and add yourself as a *required reviewer*.
   This is what turns the release into a *proposal* awaiting approval.
2. **Settings → Secrets and variables → Actions:**
   - `NPM_TOKEN` — npm automation token, for `npm publish`.
   - `RELEASE_TOKEN` *(recommended)* — a fine-grained PAT with `contents: write`.
     Add it to the *bypass* list in master's branch protection so the release bump
     commit can be pushed. Without it the workflow falls back to `GITHUB_TOKEN`,
     which cannot push to a protected branch.

## Day-to-day

1. Branch `feature/x` off `master`.
2. Open a PR into `master` with one `release:*` label.
3. Merge once CI is green.
4. Approve the `release` environment → it tags, publishes and creates the GitHub Release.
