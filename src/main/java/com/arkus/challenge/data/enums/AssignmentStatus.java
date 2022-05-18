package com.arkus.challenge.data.enums;

public enum AssignmentStatus {
    ASSIGNED(1),
    UNASSIGNED(2);
    private final int value;
    AssignmentStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
