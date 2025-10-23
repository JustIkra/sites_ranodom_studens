import type React from 'react';

export interface Service {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  fullDescription: {
    intro: string;
    points: string[];
    outro: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  donationInfo: {
    goal: number;
    collected: number;
    purpose: string;
  };
  themes?: string[];
  approach?: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  galleryImages?: string[];
}
