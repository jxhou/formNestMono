# Repository Organization for Unified CI/CD

To achieve a **Unified CI/CD** pipeline (where one commit triggers builds for both frontend and backend, or where integration tests run across both), the way you organize your repositories is critical.

Since `survey-form` is already a git repository but `react-vite` is not, you have two main options.

## Option 1: Monorepo (Recommended)

This is the simplest approach for unified CI/CD. You place both projects into a single GitHub repository.

**Structure:**
```
my-awesome-project/ (Git Root)
├── .github/workflows/ci-cd.yml
├── infrastructure/
├── react-vite/
└── survey-form/
```

**Pros:**
- **Single Pipeline**: One `.yml` file can see and build everything.
- **Atomic Commits**: You can change the API in `survey-form` and the consuming code in `react-vite` in a single commit.
- **Easy Integration Testing**: Spin up the backend and test the frontend against it easily.

**How to migrate:**
1.  Initialize a git repo at the root (`nestJS` folder).
2.  Move the existing `survey-form` git history into this new root (using `git subtree` or just copying files if history isn't critical).
3.  Add `react-vite` and `infrastructure`.
4.  Push to a new GitHub repository.

## Option 2: Polyrepo (Separate Repos)

Keep `survey-form` in its own repo, and make new repos for `react-vite` and `infrastructure`.

**Structure:**
- `github.com/user/survey-form`
- `github.com/user/react-vite`
- `github.com/user/infrastructure` (contains docker-compose and k8s manifests)

**Pros:**
- Independent versioning.
- Access control (different teams for frontend/backend).

**Cons:**
- **Complex CI/CD**: To run an integration test, the `infrastructure` pipeline needs to know *which version* of frontend and backend to test together.
- **Coordination**: You need to use "Repository Dispatch" events to trigger the deployment repo when the app repos change.

## Recommendation

**Go with Option 1 (Monorepo).**

For a team of your size (or even small teams), the overhead of managing 3 separate repositories and coordinating their deployments is unnecessary. A monorepo gives you the "Unified CI/CD" you asked for out of the box.

### Migration Steps for Monorepo

If you want to preserve `survey-form` history:
1.  Rename the current `survey-form` folder to something else temporarily.
2.  Clone your `survey-form` repo into the root.
3.  Move all files in that repo into a `survey-form/` subdirectory *within* the repo.
4.  Commit.
5.  Add `react-vite` and `infrastructure` folders.
6.  Commit.
