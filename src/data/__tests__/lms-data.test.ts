import { describe, expect, it } from "vitest";
import {
  INITIAL_GRADES,
  LESSON_MODULES,
  STUDENT_PROFILE,
  SUPPORT_CONTACT,
} from "../lms-data";

describe("Erudite SAP Business One LMS Data", () => {
  it("contains the expected student profile", () => {
    expect(STUDENT_PROFILE.name).toBe("NEIL ALFRED JAGORIN SIERRA");
    expect(STUDENT_PROFILE.studentId).toBe("2024-2-01779");
    expect(STUDENT_PROFILE.courseSection).toBe("IT302-WM");
  });

  it("includes all 5 modules and 14 pages for Hardware Requirements Guide", () => {
    expect(LESSON_MODULES).toHaveLength(5);
    const hrg = LESSON_MODULES.find(
      (m) => m.slug === "hardware-requirements-guide"
    );
    expect(hrg).toBeDefined();
    expect(hrg?.totalPages).toBe(14);
    expect(hrg?.pages).toHaveLength(14);
    expect(hrg?.pages[0].classification).toBe("PUBLIC");
    expect(hrg?.pages[0].version).toContain("1.16");
  });

  it("matches initial Grade Summary values and support hours", () => {
    const sqlGrade = INITIAL_GRADES.find(
      (g) => g.slug === "m1-installing-ms-sql-server"
    );
    expect(sqlGrade?.score).toBe("9/10");
    expect(sqlGrade?.rating).toBe("94");
    expect(SUPPORT_CONTACT.loginHours).toBe("Monday to Friday, 8AM-6PM");
    expect(SUPPORT_CONTACT.authHours).toBe("Monday to Friday, 8AM-5PM");
  });
});
