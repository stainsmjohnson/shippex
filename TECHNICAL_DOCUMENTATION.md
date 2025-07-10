# Shippex - Technical Documentation

## Table of Contents

1. [Key Features](#key-features)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Modules](#core-modules)
6. [Authentication System](#authentication-system)
7. [Navigation System](#navigation-system)
8. [State Management](#state-management)
9. [UI Components](#ui-components)
10. [Services Layer](#services-layer)
11. [Data Models](#data-models)
12. [Styling System](#styling-system)
13. [Development Setup](#development-setup)
14. [Future Scope](#future-enhancements)

## Key Features

- **Shipment Management**: View and filter shipments with real-time status updates
- **Authentication**: Mocked authentication flow, with mocked secure token storage implementation
- **Responsive Design**: Cross-platform compatibility (iOS/Android)

## Architecture

The application follows a **Clean Architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────-┐
│                    Presentation Layer                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │   Screens   │ │ Components  │ │   Sheets    │ │  HOCs   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
└─────────────────────────────────────────────────────────────-┘
┌─────────────────────────────────────────────────────────────-┐
│                     Business Logic Layer                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │   Hooks     │ │  Context    │ │ Providers   │ │  Utils  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
└────────────────────────────────────────────────────────────-─┘
┌────────────────────────────────────────────────────────────-─┐
│                      Core Layer                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │    Auth     │ │   Theme     │ │ Constants   │ │  Types  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
└───────────────────────────────────────────────────────────-──┘
┌──────────────────────────────────────────────────────────-───┐
│                     Data Layer                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │  Services   │ │   API       │ │   Storage   │ │  Cache  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
└──────────────────────────────────────────────────────────-───┘
```

### Architecture Principles

- **Separation of Concerns**: Each layer has a specific responsibility
- **Single Responsibility**: Each module has one clear purpose
- **Testability**: Business logic is isolated and easily testable

## Technology Stack

### Core Technologies

- **React Native**: 0.80.1 - Cross-platform mobile development
- **React**: 19.1.0
- **TypeScript**: 5.0.4 - Type safety and developer experience

### Navigation

- **@react-navigation/native**: 7.1.14 - Navigation framework
- **@react-navigation/bottom-tabs**: 7.4.2 - Tab navigation
- **@react-navigation/native-stack**: 7.3.21 - Stack navigation

### UI & Animation

- **react-native-reanimated**: 3.18.0 - Native animations
- **react-native-gesture-handler**: 2.27.1 - Gesture handling
- **react-native-svg**: 15.12.0 - SVG support

### Networking & Data

- **axios**: 1.10.0 - HTTP client
- **lodash**: 4.17.21 - Utility functions

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Metro**: JavaScript bundler

## Project Structure

```
shippex/
├── src/
│   ├── assets/               # Static assets (images, SVGs)
│   ├── context/              # React Context definitions
│   ├── core/                 # Core application logic
│   │   ├── auth/             # Authentication system
│   │   ├── theme/            # Theming system
│   │   └── constants.ts      # Application constants
│   ├── hoc/                  # Higher-Order Components
│   ├── hooks/                # Custom React hooks
│   ├── navigator/            # Navigation configuration
│   ├── presentation/         # UI layer
│   │   ├── components/       # Reusable UI components
│   │   ├── screens/          # Screens
│   │   └── sheets/           # Bottom sheets
│   ├── providers/            # Context providers
│   ├── services/             # API and external services
│   └── utils/                # Utility functions
├── android/                  # Android-specific code
├── ios/                      # iOS-specific code
└── __tests__/                # Test files
```

## Core Modules

### 1. Authentication Module (`src/core/auth/`)

```typescript
// Authentication Context Type
export type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: any;
  isLoggedIn: boolean;
  login: (url: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<User | null>;
};
```

### 2. Theme Module (`src/core/theme/`)

- `makeStyle.ts`: Style creation utility
- `themes/light.ts`: Light theme configuration

**Theme Structure:**

```typescript
export const lightTheme = {
  colors: {
    primary: '#2F50C1',
    secondary: '#D9E6FD',
    background: '#FFFFFF',
    // ... more colors
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 6, md: 8, lg: 12 },
  typography: {
    heading: { fontSize: 18, fontWeight: '700' },
    body: { fontSize: 14, fontWeight: '400' },
    small: { fontSize: 12, fontWeight: '300' },
  },
};
```

## Authentication System

### Authentication Flow

1. **App Launch**

   - Check for existing authentication token
   - Initialize authentication state
   - Redirect to appropriate screen

2. **Login Process**

   - User enters URL, username/email, and password
   - Validation of input fields
   - API call to `auth` service
   - Token and user data storage
   - Navigation to main app

3. **Session Management**
   - Token-based authentication
   - Secure storage for sensitive data

**What not handled**

- Automatic session restoration / expiry

### Implementation Details

```typescript
// Login validation
const _validate = () => {
  let _errors: ErrorType = { url: null, username: null, password: null };

  if (!url || !isValidURL('https://' + url)) {
    _errors.url = 'Enter valid url!';
  }

  if (
    !usernameOrEmail ||
    !(isValidEmail(usernameOrEmail) || isValidUsername(usernameOrEmail))
  ) {
    _errors.username = 'Enter valid username or email address!';
  }

  if (!password || !isValidPassword(password)) {
    _errors.password = password ? 'Invalid password!' : 'Enter password!';
  }

  return Object.values(_errors).some(value => !!value);
};
```

## Navigation System

### Navigation Structure

The app uses a combination of stack and tab navigation:

```
Root Navigator - (Splash - fallback)
├── Authentication Stack
│   ├── PreLogin Screen - (Landing screen for non-authenticated user)
│   └── Login Screen (Modal)
└── Main App Stack
    └── Tab Navigator
        ├── Shipments Tab
        ├── Scan Tab
        ├── Wallet Tab
        └── Profile Tab
```

### Route Configuration

```typescript
export const routes = {
  SPLASH: 'SPLASH',
  PRELOGIN: 'PRELOGIN',
  LOGIN: 'LOGIN',
  TABS: 'TABS',
  PROFILE: 'PROFILE',
  SCAN: 'SCAN',
  SHIPMENTS: 'SHIPMENTS',
  WALLET: 'WALLET',
};
```

## State Management

### Context-Based State Management

1. **AuthProvider**: Authentication state
2. **ThemeProvider**: Theme state
3. **ShipmentProvider**: Shipment data and filters

### Custom Hooks

```typescript
// useShipments hook
export const useShipments = () => {
  const context = React.useContext(ShipmentContext);
  if (!context) {
    throw new Error('useShipments must be used within an ShipmentProvider');
  }
  return context;
};
```

### State Structure

```typescript
// Shipment State
export type ShipmentContextType = {
  shipments: ShipmentItemType[];
  filters: FiltersType;
  setFilter: (filter: Partial<FiltersType>) => void;
  fetch: () => void;
  loading: boolean;
  error: string | null;
};
```

## UI Components

### Component Library

#### 1. Button Component

```typescript
type Props = {
  title: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'gray';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  onPress?: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
};
```

**Features:**

- Multiple button types and sizes
- Loading states
- Icon support

#### 2. TextBox Component

- Input validation
- Error states
- Prefix support
- label animations

#### 3. Checkbox Component

- Custom styling
- Label support

#### 4. SearchBar Component

### Screen Components

#### Shipments Screen

- Shipment list with filtering
- Mark all functionality
- Error handling
- Loading states

#### Login Screen

- Form validation
- Error display

## Services Layer

### API Services

#### 1. Authentication Service (`src/services/auth.ts`)

```typescript
export const login = async (
  url: string,
  usernameOrEmail: string,
  password: string,
) => {
  try {
    const response = await NetworkHandlerMocked.post('login', {
      url,
      usernameOrEmail,
      password,
    });

    // Validation logic
    if (
      url === 'example.com' &&
      usernameOrEmail === 'john' &&
      password === '123456'
    ) {
      return [null, response?.data];
    }

    throw new Error('Invalid user');
  } catch (err) {
    return [err, null];
  }
};
```

#### 2. Shipment Service (`src/services/shipments.ts`)

```typescript
export const getShipments = async () => {
  try {
    const response = await NetworkHandlerMocked.post('shipments');
    return [null, response?.data];
  } catch (err) {
    return [err, null];
  }
};
```

### Mock Data System

The application uses a mock data system for development:

```typescript
export const NetworkHandlerMocked = {
  get: (url: string, _config?: any): any => getMockData(url),
  post: (url: string, _config?: any): any => getMockData(url),
  put: (url: string, _config?: any): any => getMockData(url),
  patch: (url: string, _config?: any): any => getMockData(url),
  delete: (url: string, _config?: any): any => getMockData(url),
};
```

## Data Models

### Shipment Model

```typescript
export type ShipmentItemType = {
  shipmentId: string;
  label: string;
  from: {
    city: string;
    address: string;
  };
  to: {
    city: string;
    address: string;
  };
  status: 'RECEIVED' | 'CANCELED' | 'DELIVERED' | 'ON_HOLD' | 'ERROR';
  phone: string;
};
```

### User Model

```typescript
export type User = {
  id: number;
  name: string;
  imageUrl: string | null;
};
```

### Filter Model

```typescript
export type FiltersType = {
  query: string;
  statuses: string[];
};
```

## Styling System

### Theme-Based Styling

The app uses a centralized theme system with:

1. **Color Palette**: Primary, secondary, background, text colors
2. **Spacing System**: Consistent spacing values (xs, sm, md, lg, xl)
3. **Border Radius**: Standardized corner radius values
4. **Typography**: Font sizes and weights

### Style Creation Utility

```typescript
// makeStyle utility
const useStyles = makeStyles(({ colors, spacing, typography }) => ({
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
}));
```

## Development Setup

### Prerequisites

- Node.js >= 18
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd shippex
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start Metro bundler**

   ```bash
   npm start
   ```

4. **Run the application**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

## Future Enhancements

1. **Deep Linking**
2. **Environment Configuration (Prod/Stage/QA)**
3. **Testing**
4. **Theming is inconsistant, can be improved**

---
