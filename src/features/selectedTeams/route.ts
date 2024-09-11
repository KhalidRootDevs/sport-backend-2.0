import { Router } from "express";
import { authenticate, authorizeRoles } from "../../middlewares/authenticate";
import { UserRole } from "../user/model";
import { createTeam, deleteTeam, getAllTeams, getTeamById, sortTeams, updateTeam } from "./controller";

const router = Router();

router.get('/every', getAllTeams);
router.patch("/sortBy", authenticate, authorizeRoles([UserRole.ADMIN, UserRole.MODERATOR]), sortTeams);
router.get('/all', getAllTeams);
router.post('/create', authenticate, authorizeRoles([UserRole.ADMIN, UserRole.MODERATOR]), createTeam);
router.get('/find/:id', authenticate, getTeamById);
router.put('/update/:id', authenticate, authorizeRoles([UserRole.ADMIN, UserRole.MODERATOR]), updateTeam);
router.delete('/delete/:id', authenticate, authorizeRoles([UserRole.ADMIN, UserRole.MODERATOR]), deleteTeam);

export default router;