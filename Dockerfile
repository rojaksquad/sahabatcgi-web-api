# Use the Nixpacks base image
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1707782610@sha256:8f4b0fd95dc3311cf9a59f236d8d7d7f956fe21a2a1d64b53c82f12c4e859f09

# Set the working directory
WORKDIR /app/

# Copy the Nixpacks configuration files
COPY .nixpacks/nixpkgs-bf744fe90419885eefced41b3e5ae442d732712d.nix .nixpacks/nixpkgs-bf744fe90419885eefced41b3e5ae442d732712d.nix

# Install dependencies and clean up
RUN nix-env -if .nixpacks/nixpkgs-bf744fe90419885eefced41b3e5ae442d732712d.nix && nix-collect-garbage -d

# Copy the current contents of the uploads directory into the container
COPY uploads /app/uploads

# Copy the application files into the container
COPY . /app/

# Install dependencies using npm ci
RUN --mount=type=cache,id=s/e3ea3cd0-dcdf-4cf4-9e6d-b4890a8f0551-/root/npm,target=/root/.npm npm ci

# Add Node.js binary path to PATH
RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile