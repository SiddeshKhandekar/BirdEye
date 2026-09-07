# BirdEye — Step-by-Step Setup Guide
> **No Docker required.** This guide walks you through setting up Supabase and Stadia Maps API manually.

---

## Part 1: Supabase Setup (PostgreSQL + API + Auth)

Supabase completely replaces Directus. It provides a PostGIS-enabled database, instant REST/GraphQL APIs, Auth, and Storage.

### Step 1: Execute Database Schema
You already created your Supabase project! Now we need to create the tables.
1. Go to your Supabase Dashboard: **https://supabase.com/dashboard/project/_**
2. In the left menu, click **SQL Editor**.
3. Create a **New Query**.
4. Open the file `db/init-postgis.sql` in your local IDE, **copy everything**, and paste it into the Supabase SQL Editor.
5. Click **Run**.
*(This will enable PostGIS and create the `tenants`, `issues`, `issue_clusters`, and `citizen_karma` tables).*

### Step 2: Get your Service Role Key
For your Python AI Backend to securely read/write all issues (bypassing normal user security rules), it needs the Secret Service Role Key:
1. In Supabase, go to **Project Settings** (the gear icon) → **API**.
2. Look under "Project API Keys" for the **`service_role` (secret)** key.
3. Click "Reveal" and **copy** it.
4. Paste it into your local `.env` file as `SUPABASE_SERVICE_ROLE_KEY`.

---

## Part 2: Stadia Maps API Setup (Your Map Engine)

### Step 1: Create a Stadia Maps Account
1. Go to **https://client.stadiamaps.com/signup/**
2. Sign up (free tier gives 200,000 map loads/month)
3. After login, you land on the **Dashboard**

### Step 2: Create an API Key
1. In the dashboard, click **"Add Property"**
2. Property name: `birdeye-dev`
3. Property type: choose **"Domain"** for web apps
4. Add your domain: `localhost` (for development)
5. Click **"Create"**
6. Your API key will appear — **copy it** and paste it into your `.env` file as `NEXT_PUBLIC_STADIA_MAPS_API_KEY`.

---

## Next Steps
Once you have run the SQL script in Supabase and filled out your `.env` file, your backend infrastructure is fully operational!
