# LEGO® Education Marketing Showcase Site

Welcome to the **LEGO® Education Marketing & Showcase Site**—a high-fidelity React + TypeScript + Vite web application built to mirror the layout patterns, visual guidelines, and interactive polish of the official LEGO storefront. 

This platform serves as an interactive **promotional showcase** rather than a real transaction store, offering teachers and school administrators an engaging workspace to discover educational STEM kits, standard-aligned curriculum packages, and student projects.

---

## 🚀 How to Run the Application

The showcase runs entirely in a client-side sandbox using local session storage and React Context APIs.

### 1. Install Dependencies
Ensure you are in the project root directory, then run:
```bash
npm install
```

### 2. Start the Local Dev Server
Launch Vite on our routed reverse proxy port (`3000`):
```bash
npm run dev
```

### 3. Build for Production
To bundle assets and compile the static files into `dist/`, execute:
```bash
npm run build
```

---

## 🗄️ Backend Integration & Storage Guide

Our custom feature **"My Creations" Photo Upload Gallery** currently stores student-uploaded models in local state and session arrays (retaining uploaded Base64 image files within the active browser session).

For a production environment, here is where and how a backend server should be plugged in:

### 1. File Upload Handler (`/src/components/UploadForm.tsx`)
In `UploadForm.tsx` within the `handleUploadSubmit` event handler, replace the simulated setTimeout delay with an asynchronous multi-part Form submission:
```typescript
const handleUploadSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsUploading(true);

  try {
    const formData = new FormData();
    formData.append("image", imageFile); // The raw JPEG/PNG/WebP file object
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("displayName", displayName);

    const response = await fetch("/api/creations/upload", {
      method: "POST",
      body: formData // Server parses multipart form and uploads image to Cloud Storage
    });
    
    if (!response.ok) throw new Error("Upload failed");
    const newCreation = await response.json();
    
    // Add returning saved database item to state
    setCreations(prev => [newCreation, ...prev]);
  } catch (err) {
    setErrorMessage("Upload failed. Please verify server connection.");
  } finally {
    setIsUploading(false);
  }
};
```

### 2. Data Synchronization (`/src/context/AppContext.tsx`)
In `AppContext.tsx`, replace the pre-seeded localStorage arrays with an initial fetch inside `useEffect` querying your relational or document database:
```typescript
useEffect(() => {
  async function fetchCreations() {
    try {
      const res = await fetch("/api/creations");
      const data = await res.json();
      setCreations(data);
    } catch (e) {
      console.error("Failed to load community gallery", e);
    }
  }
  fetchCreations();
}, []);
```

### 3. Recommended Production Tech Stack
- **File Storage**: Google Cloud Storage / Firebase Storage (optimal for hosting user-submitted JPEGs).
- **Metadata Database**: Firebase Firestore (perfect for real-time updates and lightning-fast queries) or Cloud SQL PostgreSQL (relational structure for curriculum associations).
- **Server API**: Node.js Express server to handle multipart payload validations and sanitize user free-text fields.
# lego_education
