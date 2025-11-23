# Linksy Product Requirements Document (PRD)

## 1. Product Summary

Linksy is a web application for managing bookmarks organized by user-defined groups.

## 2. Core Requirements

### Authentication

- Users can register and log in using email and password.
- Session handling and protected routes.

### Group Management

- Create groups with name, description, and optional color.
- Edit existing groups.
- Delete groups and their associated bookmarks.

### Bookmark Management

- Add bookmarks to a selected group.
- Edit bookmarks (URL, title, description, assigned group).
- Delete bookmarks.

### Dashboard

- Display recent bookmarks.
- Display user-created groups.

## 3. Non-functional Requirements

- Responsive UI
- Secure data access using Supabase RLS
- Type-safe frontend with TypeScript
