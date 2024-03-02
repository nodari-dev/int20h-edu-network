import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Auth as AuthLayout, System as SystemLayout } from "../../layouts";
import {
  Analytics,
  CreateGroup,
  CreateNewsletter,
  Dashboard,
  Group,
  Groups,
  Newsletter,
  Newsletters,
  NotFound,
  Profile,
  SignIn,
  Students,
  Assignment,
  Assignments,
  Calendar,
  CreateAssignment,
  CreateStudent,
  CreateTeacher,
  CreateSubject,
  Student,
  Journals, Question, Questions, Subject, Subjects, Teacher, Teachers,
} from "../../pages";
import { withCheckAuthorization, withCheckRole } from "../../hocs";
import { useAuthorization } from "../../hooks";

enum ROLE {
  ADMIN = "Admin",
  TEACHER = "Teacher",
  STUDENT = "Student"
}

interface IProps {}

export const Router: FC<IProps> = (): JSX.Element => {
  const { isAuthorized } = useAuthorization();

  const PageAnalyticsWithCheckAuthorization = withCheckAuthorization(withCheckRole(Analytics, [ROLE.ADMIN, ROLE.TEACHER]));
  const PageAssignmentWithCheckAuthorization = withCheckAuthorization(withCheckRole(Assignment, [ROLE.STUDENT, ROLE.TEACHER]));
  const PageAssignmentsWithCheckAuthorization = withCheckAuthorization(withCheckRole(Assignments, [ROLE.STUDENT, ROLE.TEACHER]));
  const PageCalendarWithCheckAuthorization = withCheckAuthorization(withCheckRole(Calendar, [ROLE.STUDENT, ROLE.TEACHER]));
  const PageCreateAssignmentWithCheckAuthorization = withCheckAuthorization(withCheckRole(CreateAssignment, ROLE.TEACHER));
  const PageCreateGroupWithCheckAuthorization = withCheckAuthorization(withCheckRole(CreateGroup, ROLE.ADMIN));
  const PageCreateNewslettersWithCheckAuthorization = withCheckAuthorization(withCheckRole(CreateNewsletter, [ ROLE.ADMIN, ROLE.TEACHER ]));
  const PageCreateStudentWithCheckAuthorization = withCheckAuthorization(withCheckRole(CreateStudent, ROLE.ADMIN));
  const PageCreateTeacherWithCheckAuthorization = withCheckAuthorization(withCheckRole(CreateTeacher, ROLE.ADMIN));
  const PageCreateSubjectWithCheckAuthorization = withCheckAuthorization(withCheckRole(CreateSubject, ROLE.ADMIN));
  const PageDashboardWithCheckAuthorization = withCheckAuthorization(Dashboard);
  const PageGroupWithCheckAuthorization = withCheckAuthorization(withCheckRole(Group, [ ROLE.ADMIN, ROLE.TEACHER ]));
  const PageGroupsWithCheckAuthorization = withCheckAuthorization(withCheckRole(Groups, [ ROLE.ADMIN, ROLE.TEACHER ]));
  const PageJournalsWithCheckAuthorization = withCheckAuthorization(withCheckRole(Journals, ROLE.TEACHER));
  const PageNewsletterWithCheckAuthorization = withCheckAuthorization(withCheckRole(Newsletter, [ ROLE.ADMIN, ROLE.TEACHER ]));
  const PageNewslettersWithCheckAuthorization = withCheckAuthorization(withCheckRole(Newsletters, [ ROLE.ADMIN, ROLE.TEACHER ]));
  const PageProfileWithCheckAuthorization = withCheckAuthorization(Profile);
  const PageQuestionWithCheckAuthorization = withCheckAuthorization(withCheckRole(Question, ROLE.TEACHER));
  const PageQuestionsWithCheckAuthorization = withCheckAuthorization(withCheckRole(Questions, ROLE.TEACHER));
  const PageStudentWithCheckAuthorization = withCheckAuthorization(withCheckRole(Student, [ ROLE.ADMIN, ROLE.TEACHER ]));
  const PageStudentsWithCheckAuthorization = withCheckAuthorization(withCheckRole(Students, [ ROLE.ADMIN, ROLE.TEACHER ]));
  const PageSubjectWithCheckAuthorization = withCheckAuthorization(withCheckRole(Subject, [ ROLE.ADMIN, ROLE.TEACHER ,ROLE.STUDENT]));
  const PageSubjectsWithCheckAuthorization = withCheckAuthorization(withCheckRole(Subjects, [ ROLE.ADMIN, ROLE.TEACHER ,ROLE.STUDENT]));
  const PageTeacherWithCheckAuthorization = withCheckAuthorization(withCheckRole(Teacher, ROLE.ADMIN));
  const PageTeachersWithCheckAuthorization = withCheckAuthorization(withCheckRole(Teachers, ROLE.ADMIN));

  return (
    <HashRouter>
      {isAuthorized ? <SystemLayout>
          <Routes>
            <Route path="/" element={<PageDashboardWithCheckAuthorization />} />
            <Route path="/profile" element={<PageProfileWithCheckAuthorization />} />

            <Route path="/students/all" element={<PageStudentsWithCheckAuthorization />} />
            <Route path="/students/:id" element={<PageStudentWithCheckAuthorization />} />
            <Route path="/students/create" element={<PageCreateStudentWithCheckAuthorization />} />

            <Route path="/teachers/all" element={<PageTeachersWithCheckAuthorization />} />
            <Route path="/teachers/:id" element={<PageTeacherWithCheckAuthorization />} />
            <Route path="/teachers/create" element={<PageCreateTeacherWithCheckAuthorization />} />

            <Route path="/group/all" element={<PageGroupsWithCheckAuthorization />} />
            <Route path="/group/:id" element={<PageGroupWithCheckAuthorization />} />
            <Route path="/group/create" element={<PageCreateGroupWithCheckAuthorization />} />

            <Route path="/analytics" element={<PageAnalyticsWithCheckAuthorization />} />

            <Route path="/newsletter/all" element={<PageNewslettersWithCheckAuthorization />} />
            <Route path="/newsletter/:id" element={<PageNewsletterWithCheckAuthorization />} />
            <Route path="/newsletter/create" element={<PageCreateNewslettersWithCheckAuthorization />} />

            <Route path="/subjects/all" element={<PageSubjectsWithCheckAuthorization />} />
            <Route path="/subjects/:id" element={<PageSubjectWithCheckAuthorization />} />
            <Route path="/subjects/create" element={<PageCreateSubjectWithCheckAuthorization />} />

            <Route path="/calendar" element={<PageCalendarWithCheckAuthorization />} />

            <Route path="/assignments/all" element={<PageAssignmentsWithCheckAuthorization />} />
            <Route path="/assignments/:id" element={<PageAssignmentWithCheckAuthorization />} />
            <Route path="/assignments/create" element={<PageCreateAssignmentWithCheckAuthorization />} />

            <Route path="/journal" element={<PageJournalsWithCheckAuthorization />} />

            <Route path="/questions" element={<PageQuestionsWithCheckAuthorization />} />
            <Route path="/questions/:id" element={<PageQuestionWithCheckAuthorization />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </SystemLayout>
        :
        <AuthLayout>
          <Routes>
            <Route path="/" element={<PageDashboardWithCheckAuthorization />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthLayout>
      }
    </HashRouter>
  );
};
