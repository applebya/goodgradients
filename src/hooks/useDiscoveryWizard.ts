import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Gradient, WizardVibe, WizardColor, WizardSelections } from '@/types';
import {
  hasCompletedWizard,
  setWizardCompleted,
  saveWizardPrefs,
  loadWizardPrefs,
  clearWizardPrefs,
  getDefaultSelections,
  filterGradientsBySelections,
  countMatchingGradients,
} from '@/lib/wizard';

export interface UseDiscoveryWizardReturn {
  isOpen: boolean;
  selections: WizardSelections;
  appliedSelections: WizardSelections | null;
  hasActiveFilters: boolean;
  filteredGradients: Gradient[];
  matchCount: number;

  openWizard: () => void;
  closeWizard: () => void;
  setVibe: (vibe: WizardVibe | null) => void;
  toggleColor: (color: WizardColor) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  // Direct manipulation of applied filters
  removeAppliedVibe: () => void;
  removeAppliedColor: (color: WizardColor) => void;
}

export function useDiscoveryWizard(allGradients: Gradient[]): UseDiscoveryWizardReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [selections, setSelections] = useState<WizardSelections>(getDefaultSelections);
  const [appliedSelections, setAppliedSelections] = useState<WizardSelections | null>(null);

  // Auto-open wizard on first visit
  useEffect(() => {
    const completed = hasCompletedWizard();
    if (!completed) {
      const timer = setTimeout(() => setIsOpen(true), 300);
      return () => clearTimeout(timer);
    } else {
      const saved = loadWizardPrefs();
      if (saved) {
        setAppliedSelections(saved);
        setSelections(saved);
      }
    }
  }, []);

  const filteredGradients = useMemo(() => {
    if (!appliedSelections) return allGradients;
    return filterGradientsBySelections(allGradients, appliedSelections);
  }, [allGradients, appliedSelections]);

  const matchCount = useMemo(() => {
    return countMatchingGradients(allGradients, selections);
  }, [allGradients, selections]);

  const hasActiveFilters = useMemo(() => {
    return appliedSelections !== null && (
      appliedSelections.vibe !== null ||
      appliedSelections.colors.length > 0
    );
  }, [appliedSelections]);

  const openWizard = useCallback(() => {
    setSelections(appliedSelections ?? getDefaultSelections());
    setIsOpen(true);
  }, [appliedSelections]);

  const closeWizard = useCallback(() => {
    setWizardCompleted();
    setIsOpen(false);
  }, []);

  const setVibe = useCallback((vibe: WizardVibe | null) => {
    setSelections(prev => ({ ...prev, vibe }));
  }, []);

  const toggleColor = useCallback((color: WizardColor) => {
    setSelections(prev => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter(c => c !== color)
          : [...prev.colors, color],
      };
    });
  }, []);

  const applyFilters = useCallback(() => {
    setWizardCompleted();
    setAppliedSelections(selections);
    saveWizardPrefs(selections);
    setIsOpen(false);
  }, [selections]);

  const clearFilters = useCallback(() => {
    setAppliedSelections(null);
    setSelections(getDefaultSelections());
    clearWizardPrefs();
  }, []);

  const removeAppliedVibe = useCallback(() => {
    const newSelections = { ...appliedSelections!, vibe: null };
    setAppliedSelections(newSelections);
    setSelections(newSelections);
    saveWizardPrefs(newSelections);
    // Clear all if nothing left
    if (newSelections.colors.length === 0) {
      clearFilters();
    }
  }, [appliedSelections, clearFilters]);

  const removeAppliedColor = useCallback((color: WizardColor) => {
    const newColors = appliedSelections!.colors.filter(c => c !== color);
    const newSelections = { ...appliedSelections!, colors: newColors };
    setAppliedSelections(newSelections);
    setSelections(newSelections);
    saveWizardPrefs(newSelections);
    // Clear all if nothing left
    if (!newSelections.vibe && newColors.length === 0) {
      clearFilters();
    }
  }, [appliedSelections, clearFilters]);

  return {
    isOpen,
    selections,
    appliedSelections,
    hasActiveFilters,
    filteredGradients,
    matchCount,
    openWizard,
    closeWizard,
    setVibe,
    toggleColor,
    applyFilters,
    clearFilters,
    removeAppliedVibe,
    removeAppliedColor,
  };
}
